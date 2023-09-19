import React from 'react';
import { Button } from 'antd'
import './App.css';
import { CopyToClipboard } from './components/CopyToClipboard';

function App() {
  return (
    <div className="App">
      <CopyToClipboard buildCopyData={()=>'123'}>
      <Button type="primary">复制--把内容放进剪贴板</Button>
      </CopyToClipboard>
    </div>
  );
}

export default App;
