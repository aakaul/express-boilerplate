import { Router } from "express";
import Container from "typedi";
import { TemplateController } from "./template.controller";

const router = Router()

const templateContorller = Container.get(TemplateController)

router.get("/",templateContorller.getAll.bind(templateContorller))
router.get("/:id",templateContorller.get.bind(templateContorller))
router.post("/",templateContorller.save.bind(templateContorller))
router.patch("/",templateContorller.patch.bind(templateContorller))
router.put("/",templateContorller.update.bind(templateContorller))
router.delete("/",templateContorller.delete.bind(templateContorller))

export default router