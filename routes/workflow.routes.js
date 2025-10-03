
import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

// Router
workflowRouter.post('/workflows/subscription/reminder', sendReminders);

export default workflowRouter;