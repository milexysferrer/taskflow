import { Button } from "./components/ui/Button";

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
    </main>
  );
}
