function NotFound() {
  return (
    <div className="bg-black text-white h-screen text-center">
      <div className="flex justify-center items-center h-[60%] flex-col gap-4">
        <h1 className="text-7xl mb-4">길을 잃으셨나요?</h1>
        <p className="text-xl mb-4">
          죄송합니다. 해당 페이지를 찾을 수 없습니다. 홈페이지로 이동해 <br />
          다양한 콘텍츠를 만나보세요.
        </p>
        <button className="border border-white py-2 px-8 rounded-md bg-white text-black font-semibold hover:bg-gray-200">
          Netflix 홈
        </button>
      </div>
      <div className="flex  justify-center items-center ">
        <div className="h-[0.1rem] bg-red-500 w-[4%] rotate-90"></div>
        <p className="text-xl">오류 코드: NSES-404</p>
      </div>
    </div>
  );
}

export default NotFound;
