import express from "express";
import { 
    getAllBruxos, 
    getBruxoById,
    createBruxo,
    deleteBruxos,
    updateBruxo
} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxoById);
router.post("/", createBruxo);
router.delete("/:id", deleteBruxos);
router.put("/:id", updateBruxo);

export default router;