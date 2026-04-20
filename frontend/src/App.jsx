import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ⚠️ Cambia esto por tu URL de Render después del deploy
const API_URL = "https://backbreak.onrender.com";

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', game: '', price: '', image: '' });

  useEffect(() => { fetchCards(); }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(API_URL);
      setCards(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando cartas");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', game: '', price: '', image: '' });
      fetchCards();
    } catch (err) { alert("Error al añadir carta"); }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks(); // Refrescar lista
    } catch (err) { console.error("Error al borrar"); }
  };

  return (
    <div className="container">
      <header>
        <h1>PokeMarket 🃏</h1>
        <p>Tu tienda de cartas TCG</p>
      </header>

      <form onSubmit={handleSubmit} className="card-form">
        <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="text" placeholder="Juego" value={formData.game} onChange={e => setFormData({...formData, game: e.target.value})} required />
        <input type="number" placeholder="Precio (€)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        <input type="text" placeholder="URL Imagen" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
        <button type="submit">Publicar Carta</button>
      </form>

      {loading ? <p>Cargando inventario...</p> : (
        <div className="grid">
          {cards.map(card => (
            <div key={card._id} className="card">
              <img src={card.image || 'https://via.placeholder.com/150'} alt={card.name} />
              <div className="card-info">
                <h3>{card.name}</h3>
                <p className="game-tag">{card.game}</p>
                <p className="price">{card.price} €</p>
                <button onClick={() => deleteCard(card._id)} className="btn-delete">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;