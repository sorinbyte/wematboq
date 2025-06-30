import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;

  const body = await req.json(); // expects { boqSheets: [...] }
  console.log(JSON.stringify(body, null, 2));
  const { boqSheets } = body;

  if (!boqSheets || !Array.isArray(boqSheets)) {
    return NextResponse.json({ error: "Invalid BOQ data" }, { status: 400 });
  }

  const standardFieldMap = {
  description: "description",
  unit: "unit",
  quantity: "quantity",
  unitPriceMaterial: "unitPriceMaterial",
  unitPriceLabour: "unitPriceLabour",
  totalPriceMaterial: "totalPriceMaterial",
  totalPriceLabour: "totalPriceLabour",
  totalPrice: "totalPrice",
};

const standardKeys: Record<string, keyof typeof standardFieldMap> = {
  "descriere": "description",
  "description": "description",
  "um": "unit",
  "u.m.": "unit",
  "q": "quantity",
  "cantitate": "quantity",
  "pu m": "unitPriceMaterial",
  "pu M": "unitPriceLabour",
  "total m": "totalPriceMaterial",
  "total M": "totalPriceLabour",
  "total": "totalPrice",
  "valoare totala": "totalPrice",
};

  const boq = await prisma.boq.create({
    data: {
      projectId,
      uploadedById: 1,
      filePath: "",
    },
  });

  for (const sheet of boqSheets) {
    const { sheetName, rows } = sheet;

    for (const row of rows) {
      const standardData: any = {};
      const dynamicFields: { key: string; value: string }[] = [];

      for (const [key, value] of Object.entries(row)) {
        const normalizedKey = key.trim().toLowerCase();

        if (standardKeys[normalizedKey]) {
          const field = standardKeys[normalizedKey];
          standardData[field] = value;
        } else {
          dynamicFields.push({
            key: key.trim(),
            value: value?.toString() ?? "",
          });
        }
      }

      await prisma.boqRow.create({
        data: {
          boqId: boq.id,
          sheetname: sheetName,
          description: standardData.description ?? "",
          unit: standardData.unit ?? null,
          quantity: parseFloat(standardData.quantity) || null,
          unitPriceMaterial: parseFloat(standardData.unitPriceMaterial) || null,
          unitPriceLabour: parseFloat(standardData.unitPriceLabour) || null,
          totalPriceMaterial: parseFloat(standardData.totalPriceMaterial) || null,
          totalPriceLabour: parseFloat(standardData.totalPriceLabour) || null,
          totalPrice: parseFloat(standardData.totalPrice) || null,
          createdByIp: ip,
          dynamicFields: {
            create: dynamicFields,
          },
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);

  const latestBoq = await prisma.boq.findFirst({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    include: {
      rows: {
        include: {
          dynamicFields: true,
        },
      },
    },
  });

  if (!latestBoq) {
    return NextResponse.json({ boqSheets: null });
  }

  const sheets: Record<string, any[]> = {};

  for (const row of latestBoq.rows) {
    if (!sheets[row.sheetname]) sheets[row.sheetname] = [];

    const rowData: Record<string, any> = {
      descriere: row.description,
      "um": row.unit,
      "q": row.quantity,
      "pu M": row.unitPriceLabour,
      "pu m": row.unitPriceMaterial,
      "total M": row.totalPriceLabour,
      "total m": row.totalPriceMaterial,
      total: row.totalPrice,
    };

    for (const field of row.dynamicFields) {
      rowData[field.key] = field.value;
    }

    sheets[row.sheetname].push(rowData);
  }

  const boqSheets = Object.entries(sheets).map(([sheetName, rows]) => ({
    sheetName,
    rows,
    headers: rows.length ? Object.keys(rows[0]) : [],
  }));

  return NextResponse.json({ boqSheets });
}