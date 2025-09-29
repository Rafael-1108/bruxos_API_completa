import express from "express";
import { 
    getAllBruxos, 
    getBruxoById,
    createBruxo,
    deleteBruxos
} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxoById);
router.post("/", createBruxo);
router.post("/:id", deleteBruxos);

export default router;