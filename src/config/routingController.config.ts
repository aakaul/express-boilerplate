import path from "path"

export default {
	controllers: [path.join(__dirname,"/routes/api/**/*.controller.js")],
	classTransformer: true,
	defaultErrorHandler:true,
	validation: false,
}