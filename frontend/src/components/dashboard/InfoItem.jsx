export default function InfoItem({ item }) {
  console.log('item:', item);
  return (
    <div>
      <p className="text-xs uppercase text-zinc-500 mb-2">
        {item.fullname}
      </p>

      <div className="bg-black border border-zinc-800 rounded-lg px-4 py-3">
        {item.value}
      </div>
    </div>
  );
}