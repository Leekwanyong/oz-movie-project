import defaultImg from '../asset/defaulImg.jpg';

function useImgOnError() {
  return (e) => {
    e.currentTarget.src = defaultImg;
  };
}

export default useImgOnError;