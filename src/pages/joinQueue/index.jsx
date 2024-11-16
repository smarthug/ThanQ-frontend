import { useParams } from "react-router-dom";

export default function JoinQueue() {
  const params = useParams();
  console.log(params.queueId); // "hotspur"


  return (
    <>

      <div>
        join Queue
      </div>

    </>
  );
}
