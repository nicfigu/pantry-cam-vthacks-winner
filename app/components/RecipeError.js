export default function RecipeError() {
  return (
    <div className="w-full h-full bg-[#3b3b3b]">
      <h1 className="text-3xl font-bold m-auto text-[#861F41]">
        {`There was an error retrieving your recipes :${"("}`}
      </h1>
    </div>
  );
}
