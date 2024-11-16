import { useParams } from "react-router-dom";

export default function ManageQueue() {
  const params = useParams();
  console.log(params.queueId); // "hotspur"
  return (
    <>

      <div>
        manage Queue
      </div>

    </>
  );
}
