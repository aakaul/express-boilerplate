import config from "config";
import multer from "multer";
import path from "path";
import { Constants } from "../utils/Contants";
import StringUtil from "../utils/string";
const rootStoragePath = config.get<string>("rootStoragePath");

export const BulkMulterOptions = (data: { name: string }) => {
	const folderPath = path.join(rootStoragePath, "/xls/" + data.name);

	return {
		storage: multer.diskStorage({
			destination: (req: any, file: any, cb: any) => {
				cb(null, folderPath);
			},
			filename: (req: any, file: any, cb: any) => {
				const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
				cb(null, file.fieldname + "_" + uniqueSuffix);
			},
		}),
		fileFilter: (req: any, file: any, cb: any) => {
			if (StringUtil.endWithAny(employeesUploadFormats(), file.originalname)) {
				cb(null, true);
			} else {
				cb(null, false);
			}
		},
		limits: {
			fieldNameSize: 255,
			fileSize: 2 * Constants.MB,
		},
	};
};

function employeesUploadFormats() {
	return ["xls", "xlsx", "csv"];
}
