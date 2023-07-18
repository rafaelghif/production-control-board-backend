import * as fs from "fs";
import { decodeYokogawaMonth, decodeYokogawaYear } from "./yokogawa.js";

export const getPlasmaOrderTag = (serialNumber) => {
    const data = fs.readFileSync(process.env.PLASMA_PATH, "utf-8");
    const rows = data.split("\r\n");

    let plasmaData = null;

    for (const row of rows) {
        const plasmaXn = row.split(",");

        const prodNo = plasmaXn[0];
        const serialNumberPlasma = plasmaXn[7];
        const msCode = plasmaXn[12];
        const sapLinkageNo = plasmaXn[20];

        if (!serialNumberPlasma) {
            continue;
        }

        if (serialNumberPlasma === serialNumber) {
            return {
                serialNumber: serialNumberPlasma,
                model: msCode,
                barcodeIssueNo: prodNo,
                sapLinkageNo
            }
        }
    }
    return plasmaData;
}

export const getInhouseSerialNumber = (serialNumber) => {
    const yearSerialNumber = decodeYokogawaYear(serialNumber.toUpperCase().substring(2, 3));
    const monthSerialNumber = decodeYokogawaMonth(serialNumber.toUpperCase().substring(3, 4));
    const daySerialNumber = serialNumber.toUpperCase().substring(4, 6);

    const serialNumberFileName = `C3${yearSerialNumber}${monthSerialNumber}${daySerialNumber}.txt`;

    const serialNumberPaths = [process.env.CANIS_PATH1, process.env.CANIS_PATH2];

    let serialNumberData = null;

    for (const serialNumberPath of serialNumberPaths) {
        const serialNumberFullPath = `${serialNumberPath}${serialNumberFileName}`;

        if (!fs.existsSync(serialNumberFullPath)) {
            continue;
        }

        const datas = fs.readFileSync(serialNumberFullPath, "utf-8");
        const rows = datas.split("\r\n");

        for (const row of rows) {
            const [serialNumberFromArr, partOrder, linkageNo] = row.split(",");

            if (serialNumberFromArr === serialNumber) {
                serialNumberData = {
                    serialNumber: serialNumber,
                    model: partOrder,
                    barcodeIssueNo: null,
                    sapLinkageNo: linkageNo?.split("-")?.length === 3 ? linkageNo : null,
                };
                return serialNumberData;
            }
        }
    }

    return serialNumberData;
};