import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerSchema } from "@/app/validators/auth";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = registerSchema.parse(body);
    const user = await db.user.findFirst({ where: { email: email } });
    if (user != null) {
      return NextResponse.json(
        { user: null, message: "User ALready exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      {
        user: rest,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
