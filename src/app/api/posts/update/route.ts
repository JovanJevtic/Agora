import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/authOptions";
import { PostCreationData } from "../../admin/createPost/route";
import { postCreationFormSchema } from "@/app/libs/validation/form";

