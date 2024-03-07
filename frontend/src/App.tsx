import { useState } from "react";

function App() {
  //ตั้งค่าตัวแปร result และฟังก์ชัน setResult โดยใช้ useState โดยกำหนดค่าเริ่มต้นเป็น ''
  const [result, setResult] = useState("");

  //สร้างฟังก์ชัน handleGetTodos เพื่อเรียกใช้ API จาก http://localhost:3000/api/todos
  const handleGetTodos = async () => {
    const response = await fetch("http://localhost:3000/api/todos"); // ส่ง request ไปที่ API
    const data = await response.text(); // รับข้อมูลที่ API ส่งกลับมา
    console.log(data);
    setResult(data); // กำหนดค่า result ให้เป็น data ที่ API ส่งกลับมา
  };

  const handleGetTodosById = async () => {
    const id = prompt("Enter id"); // รับค่า id จาก prompt
    const response = await fetch(`http://localhost:3000/api/todos/${id}`); // ส่งค่า id ไปที่ API
    const data = await response.text();
    setResult(data); // กำหนดค่า result ให้เป็น data ที่ API ส่งกลับมา
  };

  const handlePostTodos = async () => {
    const title = prompt("Enter title"); // รับค่า title จาก prompt
    const response = await fetch("http://localhost:3000/api/todos", {
      // ส่งข้อมูลไปที่ API
      method: "POST", // กำหนด method เป็น POST
      headers: {
        "Content-Type": "application/json", // กำหนด header ให้เป็น application/json
      },
      body: JSON.stringify({ title }), // ส่งข้อมูลเป็น JSON โดยใช้ JSON.stringify
    });
    const data = await response.text(); // รับข้อมูลที่ API ส่งกลับมา
    setResult(data); // กำหนดค่า result ให้เป็น data ที่ API ส่งกลับมา
  };

  const handleDeleteTodoById = async () => {
    const id = prompt("Enter id"); // รับค่า id จาก prompt
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      // ส่งค่า id ไปที่ API
      method: "DELETE", // กำหนด method เป็น DELETE
    });
    const data = await response.text(); // รับข้อมูลที่ API ส่งกลับมา
    console.log(data);
    setResult(data); // กำหนดค่า result ให้เป็น data ที่ API ส่งกลับมา
  };

  const handlePutTodoById = async () => {
    const id = prompt("Enter id"); // รับค่า id จาก prompt
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      // ส่งค่า id ไปที่ API
      method: "PUT", // กำหนด method เป็น PUT
    });
    const data = await response.text(); // รับข้อมูลที่ API ส่งกลับมา
    console.log(data);
    setResult(data); // กำหนดค่า result ให้เป็น data ที่ API ส่งกลับมา
  };
  return (
    <>
      <h1>My Todo List</h1>
      <p>{result}</p> {/* แสดงผลลัพธ์จาก API */}
      <button onClick={handleGetTodos}>getTodos</button>
      {/* สร้างปุ่มเพื่อเรียกใช้ฟังก์ชัน handleGetTodos */}
      <button onClick={handleGetTodosById}>getTodoById</button>
      {/* สร้างปุ่มเพื่อเรียกใช้ฟังก์ชัน handleGetTodosById */}
      <button onClick={handlePostTodos}>postTodo</button>
      {/* สร้างปุ่มเพื่อเรียกใช้ฟังก์ชัน handlePostTodos */}
      <button onClick={handleDeleteTodoById}>deleteTodo</button>
      {/* สร้างปุ่มเพื่อเรียกใช้ฟังก์ชัน handleDeleteTodoById */}
      <button onClick={handlePutTodoById}>putTodo</button>
      {/* สร้างปุ่มเพื่อเรียกใช้ฟังก์ชัน handlePutTodoById */}
    </>
  );
}

export default App;
