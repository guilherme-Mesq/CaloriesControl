
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CalorieTrackerApp() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [log, setLog] = useState([]);

  const addEntry = () => {
    if (!food || !calories || !protein || !carbs || !fat) return;
    const newEntry = {
      food,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
    };
    setLog([newEntry, ...log]);
    setFood("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  const total = log.reduce(
    (acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fat += item.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rastreador de Calorias e Macros</h1>
      <div className="grid grid-cols-5 gap-2 mb-4">
        <Input
          placeholder="Comida"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <Input
          placeholder="Calorias"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <Input
          placeholder="Proteínas (g)"
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        <Input
          placeholder="Carboidratos (g)"
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
        />
        <Input
          placeholder="Gorduras (g)"
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
      </div>
      <Button onClick={addEntry} className="mb-6">Adicionar</Button>

      <div className="mb-6">
        <h2 className="font-semibold text-lg">Totais do Dia</h2>
        <p>Calorias: {total.calories}</p>
        <p>Proteínas: {total.protein}g</p>
        <p>Carboidratos: {total.carbs}g</p>
        <p>Gorduras: {total.fat}g</p>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Registro</h2>
        {log.map((item, index) => (
          <Card key={index} className="mb-2">
            <CardContent className="p-2">
              <strong>{item.food}</strong> - {item.calories} kcal, {item.protein}g P, {item.carbs}g C, {item.fat}g G
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
