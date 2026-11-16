import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";

export default function App() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>TaskFlow Design System</h1>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginTop: "24px",
        }}
      >
        <Button variant="primary">Create Task</Button>

        <Button variant="secondary">Cancel</Button>

        <Button variant="danger">Delete Task</Button>

        <Button loading>Saving...</Button>

        <Button disabled>Disabled</Button>
      </div>
      <section
        style={{
          display: "grid",
          gap: "20px",
          maxWidth: "400px",
          marginTop: "40px",
        }}
      >
        <h2>Input Components</h2>

        <Input label="Task title" placeholder="Enter task title" required />

        <Input
          label="Description"
          placeholder="Enter a short description"
          helperText="Give your task a meaningful description."
        />

        <Input
          label="Task title"
          placeholder="Enter task title"
          error="Task title is required."
        />

        <Input label="Disabled field" placeholder="Not available" disabled />
      </section>
    </main>
  );
}
