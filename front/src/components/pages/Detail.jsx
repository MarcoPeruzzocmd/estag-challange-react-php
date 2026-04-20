import DetailTable from "../detail/DetailTable";
import { getDetail } from "../../services/detailService";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
function Detail() {
  const { code } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    getDetail(code).then((data) => setDetail(data));
  }, [code]);
  return (
    <>
      <DetailTable detail={detail}/>
    </>
  );
}
export default Detail;
