type NoItemProps = {
  itemName: "product" | "category";
};

export default function NoItem({ itemName }: NoItemProps) {
  return (
    <div className="flex items-center justify-center min-h-96 mt-14">
      <h4 className="text-green-900 font-semibold text-3xl">
        No {itemName} found.
      </h4>
    </div>
  );
}
