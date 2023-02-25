
import * as inquirer from "inquirer";
import * as path from "path"
import fs from "fs-extra";
import StringUtil  from "../../utils/string";
import * as replace from "replace-in-file";
import pluralize from "pluralize";


const processList = ["All", "Controller", "Model","Router" ,"Service", "Repository","Dto"]

const isApi = true;

const questions: inquirer.Questions = [
	{
		name: "module-choice",
		type: "list",
		message: "What module template would you like to generate?",
		choices:processList,
	},
	{
		name: "module-name",
		type: "input",
		message: "Module name:",
		validate: (input: any) => {
			if (/^([A-Za-z\-\_\d])+$/.test(input)) {
				return true;
			} else {
				return "Module name may only include letters, numbers, and underscores.";
			}
		},
	},
];

inquirer.prompt(questions).then((ans) => {
	generateTemplate(ans)
});

function generateTemplate(data: inquirer.Answers){
    const moduleChoice = data["module-choice"];
	const moduleName = data["module-name"];
    const processObj = processRquest()[moduleChoice](moduleName)
}

function processRquest(){
    const allProcessesObj = allProcesses()
    return {
        "All":(x)=>{
            console.info("Creating All");
            Object.keys(allProcessesObj).forEach(k=>(allProcessesObj[k](x)))
        },
        ...allProcessesObj
    }
}

function allProcesses() {
    return {
        "Controller":(x)=>{
            console.info("Creating Controler");
            createController(x)
        },
        "Model":(x)=>{
            console.info("Creating Model");
            createModel(x)
        },
        "Router":(x)=>{
            console.info("Creating Router");
            createRouter(x)
        },
        "Service":(x)=>{
            console.info("Creating Service");
            createService(x)
        },
        "Repository":(x)=>{
            console.info("Creating Repository");
            createRepo(x)
        },
        "Dto":(x)=>{
            console.info("Creating Dto");
            createDto(x)
        }
    }
}


async function createController(moduleName:string){
    const sourceFile = path.resolve(
        "./src/templates/api/template/template.controller.ts"
    )
    const targetDir = path.resolve(`./src/routes/${isApi?"api":"pages"}/`);
    const targetFilename = `${moduleName}.controller.ts`;
    await createModuleFile({ sourceFile, targetDir, targetFilename, moduleName });
    console.info("Controller created")
}
async function createModel(moduleName:string){
    const sourceFile = path.resolve(
        "./src/templates/api/template/template.model.ts"
    )
    const targetDir = path.resolve(`./src/routes/${isApi?"api":"pages"}/`);
    const targetFilename = `${moduleName}.model.ts`;
    await createModuleFile({ sourceFile, targetDir, targetFilename, moduleName });
    console.info("Model created")
}
async function createRouter(moduleName:string){
    const sourceFile = path.resolve(
        "./src/templates/api/template/_router.ts"
    )
    const targetDir = path.resolve(`./src/routes/${isApi?"api":"pages"}/`);
    const targetFilename = `_router.ts`
    await createModuleFile({ sourceFile, targetDir, targetFilename, moduleName });
    console.info("Router created")
}
async function createService(moduleName:string){
    const sourceFile = path.resolve(
        "./src/templates/api/template/template.service.ts"
    )
    const targetDir = path.resolve(`./src/routes/${isApi?"api":"pages"}/`);
    const targetFilename = `${moduleName}.service.ts`;
    await createModuleFile({ sourceFile, targetDir, targetFilename, moduleName });
    console.info("Service created")
}
async function createRepo(moduleName:string){
    const sourceFile = path.resolve(
        "./src/templates/api/template/template.repository.ts"
    )
    const targetDir = path.resolve(`./src/routes/${isApi?"api":"pages"}/`);
    const targetFilename = `${moduleName}.repository.ts`;
    await createModuleFile({ sourceFile, targetDir, targetFilename, moduleName });
    console.info("Repository created")
}
async function createDto(moduleName:string){
    const sourceFile = path.resolve(
        "./src/templates/api/template/dto/template.dto.ts"
    )
    const targetDir = path.resolve(`./src/routes/${isApi?"api":"pages"}/`);
    const targetFilename = `${moduleName}.dto.ts`;
    await createModuleFile({ sourceFile, targetDir, targetFilename, moduleName, pathSuffix: "dto" });
    console.info("DTO created")
}



export async function createFile(
{ srcFile, destDir, destFilename, moduleName, pathSuffix }: { srcFile: fs.PathLike; destDir: string; destFilename: string; moduleName: string; pathSuffix?: string; }): Promise<fs.PathLike | undefined> {
    const pathArray = [destDir,moduleName,pathSuffix,destFilename].filter(Boolean)
	const destFile = path.join(...pathArray);
	try {
		fs.accessSync(destDir);
	} catch (error) {
		fs.mkdirSync(destDir);
        fs.accessSync(destDir);
	}
	try {
	    await fs.copySync(srcFile.toString(), destFile.toString());
		return destFile;
	} catch (error) {
        console.log(error)
		return;
	}
}


export async function replaceInFile(
	destFile: fs.PathLike,
	moduleName: string,
): Promise<void> {
	pluralize.addSingularRule(/singles$/i, "singular");
	const titleCaseSingular: string = StringUtil.capitalFirstLetter(moduleName);
	const titleCasePlural: string = pluralize(titleCaseSingular);
	const lowerCaseSingular: string = StringUtil.firstToLowerCase(moduleName);
	const lowerCasePlural: string = pluralize(lowerCaseSingular);

	// Replace Title Case Plural
	let options = {
		files: destFile,
		from: new RegExp("Templates", "g"),
		to: titleCasePlural,
	};
	replace.sync(options);

	// Replace Lower Case Plural
	options = {
		files: destFile,
		from: new RegExp("templates", "g"),
		to: lowerCasePlural,
	};
	replace.sync(options);

	// Replace Title Case Singular
	options = {
		files: destFile,
		from: new RegExp("Template", "g"),
		to: titleCaseSingular,
	};
	replace.sync(options);

	// Replace Lower Case Singular
	options = {
		files: destFile,
		from: new RegExp("template", "g"),
		to: lowerCaseSingular,
	};
	replace.sync(options);
	return;
}



async function createModuleFile(
{ sourceFile, targetDir, targetFilename, moduleName, pathSuffix }: { sourceFile: string; targetDir: string; targetFilename: string; moduleName: string; pathSuffix?: string; }): Promise<void> {
	// Create the file
	const destFile = await createFile(
        { srcFile: sourceFile, destDir: targetDir, destFilename: targetFilename, moduleName, pathSuffix }	);

	// Replace "Template" occurrences with the module name
	if (destFile) {
		await replaceInFile(destFile, moduleName);
	}
	return;
}