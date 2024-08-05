import { Component } from "react";
import { useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

function Stream() {
  // 输入值
  const [inputData, setInputData] = useState<string>("初始值");
  // 输出值
  const [sseData, setSseData] = useState<string>();
  // sse函数定义
  async function sendSseData() {
    const ctrl = new AbortController();
    fetchEventSource("/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: inputData,
      }),
      signal: ctrl.signal,
      async onopen(response) {
        alert("onopen");
      },
      onmessage(msg) {
        alert(msg.data);
        console.log(msg);
        setSseData(msg.data);
      },
      onclose() {
        alert("onclose");
      },
      onerror(err) {
        alert("onerror");
      },
    });
  }
  return (
    <>
      <p>{sseData}</p>
      <input value={inputData} onChange={(e) => setInputData(e.target.value)} />
      <button onClick={sendSseData}>发送</button>
    </>
  );
}

export default Stream;
