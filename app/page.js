import Todo from "@/components/todo";

export default function Home() {
  return (
    <div className="grid place-items-center min-h-dvh">
      <div className="w-full">
        <p className="text-center">Learning Redux</p>
        <Todo />
      </div>
    </div>
  );
}
