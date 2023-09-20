import React from 'react';
import { Button } from 'antd'
import { CopyToClipboard } from './components/CopyToClipboard';
import HoverTable from './components/HoverTable';

import './App.css';

function App() {
  return (
    <div className="App">
      <CopyToClipboard buildCopyData={()=>'123'}>
      <Button type="primary">复制--把内容放进剪贴板</Button>
      </CopyToClipboard>
      <hr />
      <div className='wrap_hoverTable'>
        <HoverTable />
      </div>
      <hr />
    </div>
  );
}

export default App;
