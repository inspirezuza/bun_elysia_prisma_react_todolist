import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

// เอาไว้เชื่อมต่อกับฐานข้อมูล
const db = new PrismaClient();

// สร้าง instance ของ Elysia
const app = new Elysia();

// เปิดให้ Elysia รับทุก request จะทุก origin
app.use(cors({ methods: "*" }));

// ใช้งาน swagger
app.use(swagger());

// สร้าง endpoint ที่ path /api/todos โดยให้แสดงข้อมูลทั้งหมดจากตาราง todo ด้วยคำสั่ง findMany()
app.get("/api/todos", async () => db.todo.findMany());

// สร้าง endpoint ที่ path /api/todos/:id โดยมันจะรับค่า id แล้ว return ข้อมูลตาม id ที่ใส่เข้าไป
app.get("/api/todos/:id", async ({ params }: any) =>
  db.todo.findUnique({ where: { id: Number(params.id) } })
);

// สร้าง post endpoint เพิ่มข้อมูลลงในฐานข้อมูลตาม body ที่รับเข้ามา
app.post(
  "api/todos",
  async ({ body }) =>
    db.todo.create({
      data: body,
    }),
  {
    body: t.Object({
      // ตรวจสอบว่า body ที่ส่งเข้ามี type เป็น object
      title: t.String(), // ต้องมี key ชื่อ title และมี type เป็น string
    }),
  }
);

// สร้าง endpoint delete โดยรับค่า id แล้วลบข้อมูลตาม id ที่รับเข้ามา
app.delete("/api/todos/:id", async ({ params }: any) =>
  db.todo.delete({ where: { id: Number(params.id) } })
);

// สร้าง endpoint put โดยรับค่า id กับ body แล้วแก้ไข id เป็นข้อมูลตาม body ที่รับเข้ามา
app.put("api/todos/:id", async ({ params }: any) => {
  // รับค่า getTodo เพื่อจะดูว่า completed มีค่าเป็น true หรือ false
  const getTodo = await db.todo.findUnique({
    where: { id: Number(params.id) },
  });
  // update กลับค่า completed ให้เป็นตรงข้ามกับค่าเดิม
  const updateTodo = await db.todo.update({
    where: {
      id: Number(params.id),
    },
    data: {
      completed: !getTodo?.completed,
    },
  });
  return updateTodo;
});

// สร้าง http server ที่ port 3000
app.listen(3000);

// console.log ที่ฝั่ง server
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
