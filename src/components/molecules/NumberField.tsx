export default function NumberField() {
  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        {" "}
        Quantity{" "}
      </label>

      <div className="flex items-center rounded border border-gray-200">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:text-green-800"
        >
          -
        </button>

        <input
          type="number"
          id="Quantity"
          defaultValue="1"
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none focus:outline-primary focus:ring-0 focus:border-transparent "
        />

        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:text-green-800"
        >
          +
        </button>
      </div>
    </div>
  );
}
