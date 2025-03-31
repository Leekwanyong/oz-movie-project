
function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg mt-28 h-[25rem] p-4 flex flex-col gap-2 animate-pulse">
      <div className="bg-gray w-full h-[70%] rounded-lg"></div>
      <div className="bg-gray w-[70%] h-4 rounded-md"></div>
      <div className="bg-gray w-[40%] h-3 rounded-md"></div>
    </div>
  );
}

export default SkeletonCard;