import { verifyCloudProof } from '@worldcoin/minikit-js'

export async function onRequestPost({ request }) {
    // try {
    //   // 요청의 JSON Body 읽기
    //   const body = await request.json();

    //   // 요청 데이터 처리 (예: 검증 또는 저장)
    //   const responseMessage = {
    //     message: "Data received successfully",
    //     receivedData: body,
    //   };

    //   return new Response(JSON.stringify(responseMessage), {
    //     headers: { "Content-Type": "application/json" },
    //   });
    // } catch (error) {
    //   return new Response(JSON.stringify({ error: "Invalid Request" }), {
    //     status: 400,
    //     headers: { "Content-Type": "application/json" },
    //   });
    // }


    const { payload, action, signal } = (await request.json())
    // const app_id = process.env.APP_ID as `app_${string}`
    const app_id = "app_1f5f31474d5dd3e3bd5f5d77aabcf627"
    const verifyRes = (await verifyCloudProof(payload, app_id, action, signal))  // Wrapper on this

    if (verifyRes.success) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        // return NextResponse.json({ verifyRes, status: 200 })
        return new Response(JSON.stringify({ verifyRes }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        // This is where you should handle errors from the World ID /verify endpoint.
        // Usually these errors are due to a user having already verified.
        // return NextResponse.json({ verifyRes, status: 400 })

        return new Response(JSON.stringify({ verifyRes }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

}
