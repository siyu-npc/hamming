import 'antd/dist/antd.css';
import { Layout, Form, Input, Button } from 'antd';
import { useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;

function encode(value) {
  const findMinK = length => {
    for (var k = 1; k < 64; k++) {
      if (Math.pow(2, k) >= (length + k + 1)) {
        return k;
      }
    }
    return 0;
  };
  var initCode = value.split(""); // the code of initial input
  var k = findMinK(initCode.length);
  if (k === 0) {
    return "too large";
  }
  var encodeByte = new Array(initCode.length + k).fill(-1);
  for (var i = 0; i < k; i++) {
    encodeByte[Math.pow(2, i) - 1] = 0;
  }
  for (var j = 0,m = 0; j < encodeByte.length && m < initCode.length; j++) {
    if (encodeByte[j] === -1) {
      encodeByte[j] = initCode[m];
      m++;
    }
  }
  for (i = 0; i < k; i++) {
    for (j = 1; j <= encodeByte.length; j++) {
      if (j & Math.pow(2, i) !== 0) {
        encodeByte[Math.pow(2, i) - 1] ^= encodeByte[j - 1];
      }
    }
  }
  return encodeByte.join("");
}

function App() {
  const [form] = Form.useForm();
  // const [ endodedCode, setEncodedByte ] = Form.useForm("");

  const [initalValue, setInitialValue] = useState('');
  const [encodedCode, setEncodedCode ] = useState('');


  const onFinish = value => {
    //result = encode(value.initial);
    console.log('initalValue : ' + initalValue);
    console.log('encodedCode : ' + encodedCode);
  };

  return (
    <div>
      <Header style={{ backgroundColor: "#3b4f79" }}>
        <h1>Hamming Code</h1>
      </Header>
      <Content theme="light">
        <Form
          name="hamming" style={{ labelAlign: "right", size: "large" }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Input the binary code to be encoded"
            name="initial"
            rules={[{ required: true, message: 'Please input the binary code to be encoded!' }]}
            style={{ width: "61.2%", display: "block", marginLeft: "auto", marginRight: "auto" }}
          >
            <Input size="large" onChange={(e) => setInitialValue(e.target.value)}/>
          </Form.Item>
          <Form.Item
            style={{ width: "61.2%", display: "block", marginLeft: "auto", marginRight: "auto" }}
          >
            <Button type="primary" htmlType="submit" onClick={() => setEncodedCode(encode(initalValue))}>Submit</Button>
          </Form.Item>
          <Form.Item
            style={{ width: "61.2%", display: "block", marginLeft: "auto", marginRight: "auto" }}
          >
            <Input.TextArea value={encodedCode}></Input.TextArea>
          </Form.Item>
        </Form>
      </Content>
      <Footer>汉明码加密程序</Footer>
    </div>
  );
}

export default App;
