import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/test" element={<Test />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
