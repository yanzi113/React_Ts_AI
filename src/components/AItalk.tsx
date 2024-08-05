import { Component } from "react";
import { useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

function AItalk() {
  // 输入值
  const [inputData, setInputData] = useState<string>("");
  // 输出值
  const [sseData, setSseData] = useState<string>("");
  // sse函数定义
  async function sendSseData() {
    // ctrl 目的：为了让我们能够中断链接
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
        // alert("onopen");
      },
      onmessage(msg) {
        // alert(msg.data);
        console.log(msg);
        // setSseData(msg.data);
        // 累加保存一个完整的句子
        setSseData((prev) => prev + msg.data);
      },
      onclose() {
        alert("onclose");
        // 对话关闭的时候，消息结束，换行
        setSseData((prev) => prev + "\n");
      },
      onerror(err) {
        alert("onerror");
      },
    });
  }
  return (
    <>
      {/* pre代表，如果对话中有/n则自动回车 */}
      <pre>{sseData}</pre>
      <input value={inputData} onChange={(e) => setInputData(e.target.value)} />
      <button onClick={sendSseData}>发送</button>
    </>
  );
}

export default AItalk;
