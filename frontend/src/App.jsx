import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ⚠️ Cambia esto por tu URL de Render después del deploy
const API_URL = "https://backbreak.onrender.com";

function App() {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ name: '', game: '', price: '', image: '' });

  useEffect(() => { fetchCards(); }, []);

  const fetchCards = async () => {
    const res = await axios.get(API_URL);
    setCards(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ name: '', game: '', price: '', image: '' });
    fetchCards();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchCards();
  };

  return (
    <div className="App">
      <h1>Cardmarket Clone 🃏</h1>
      
      <form onSubmit={handleAdd} className="card-form">
        <input placeholder="Nombre Carta" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Juego (Pokémon...)" value={form.game} onChange={e => setForm({...form, game: e.target.value})} required />
        <input type="number" placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input placeholder="URL Imagen" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
        <button type="submit">Publicar Carta</button>
      </form>

      <div className="card-grid">
        {cards.map(card => (
          <div key={card._id} className="card-item">
            <img src={card.image || 'https://via.placeholder.com/150'} alt={card.name} />
            <h3>{card.name}</h3>
            <p>{card.game}</p>
            <span>{card.price} €</span>
            <button onClick={() => handleDelete(card._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;