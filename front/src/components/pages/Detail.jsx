import DetailTable from "../detail/DetailTable";
import { getDetail } from "../../services/detailService";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
function Detail() {
  const { code } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDetail(code)
      .then((data) => setDetail(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  return (
    <>
      <DetailTable detail={detail}/>
    </>
  );
}
export default Detail;
