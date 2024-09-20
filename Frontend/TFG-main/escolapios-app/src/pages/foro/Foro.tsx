import React, { useState } from 'react';
import './Foro.css'; // Asegúrate de importar el archivo CSS correspondiente

interface ThreadItemProps {
  id: number;
  title?: string;
  author?: string;
  likes: number;
  responses?: ResponseItemProps[];
}

interface ResponseItemProps {
  id: number;
  author: string;
  content: string;
}

const ThreadItem: React.FC<ThreadItemProps & { onDelete: () => void; onToggleLike: () => void; onRespond: (content: string, author: string) => void }> = ({ id, title = "Post Title", author = "Admin", likes, responses = [], onDelete, onToggleLike, onRespond }) => {
  const [date, setDate] = useState<string>(getCurrentDateTime());
  const [showResponseForm, setShowResponseForm] = useState<boolean>(false);
  const [responseContent, setResponseContent] = useState<string>('');
  const [responseAuthor, setResponseAuthor] = useState<string>('');

  const handleDelete = () => {
    onDelete();
  };

  const handleToggleLike = () => {
    onToggleLike();
  };

  const handleResponse = () => {
    onRespond(responseContent, responseAuthor);
    setResponseContent('');
    setResponseAuthor('');
    setShowResponseForm(false);
  };

  return (
    <li className="thread">
      <div className="thread-title">
        <a className="thread-title-link" href="#">
          <span>{title}</span>
        </a>
        <span className="thread-title-author">by&nbsp;</span>
        <a href="#">{author}</a>
        <div className="button-container">
          <button className="delete-btn" onClick={handleDelete}>Eliminar</button>
          <button className="like-btn" onClick={handleToggleLike}>{likes > 0 ? `Ya no me gusta (${likes})` : `Me gusta (${likes})`}</button>
          <button className="respond-btn" onClick={() => setShowResponseForm(!showResponseForm)}>Responder</button>
        </div>
      </div>
      <div className="thread-date">{date}</div>
      {responses.length > 0 && (
        <ul className="response-list">
          {responses.map(response => (
            <li key={response.id} className="response">
              <div className="response-content">{response.content}</div>
              <div className="response-author">by {response.author}</div>
            </li>
          ))}
        </ul>
      )}
      {showResponseForm && (
        <div className="response-form">
          <input
            type="text"
            value={responseAuthor}
            onChange={(e) => setResponseAuthor(e.target.value)}
            placeholder="Tu nombre"
          />
          <textarea
            value={responseContent}
            onChange={(e) => setResponseContent(e.target.value)}
            placeholder="Escribe tu respuesta"
          />
          <button onClick={handleResponse}>Enviar</button>
        </div>
      )}
    </li>
  );
}

const getCurrentDateTime = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return now.toLocaleString('en-US', options);
};

const Foro: React.FC = () => {
  const [threads, setThreads] = useState<ThreadItemProps[]>([
    { id: 1, title: "La aplicación sigue sin funcionar por error 402, sigo sin saber de donde proviene", author: "Lucía", likes: 0, responses: [] },
    { id: 2, title: "Alguien que me pueda ayudar en interfaces en la practica de los coches", author: "Christian", likes: 0, responses: [] },
    { id: 3, title: "El error 404, alguno, alguien que siga por clase me ayuda? ", author: "Álvaro", likes: 0, responses: [] },
    { id: 4, title: "La base de datos ya esta acabada a ver si podeis terminar el front", author: "Álamo", likes: 0, responses: [] },
    { id: 5, title: "Chicos no puedo ir a clase si alguien lo puede comunicar perfecto", author: "Cortés", likes: 0, responses: [] }
  ]);

  const handleDelete = (id: number) => {
    const updatedThreads = threads.filter(thread => thread.id !== id);
    setThreads(updatedThreads);
  };

  const handleToggleLike = (id: number) => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === id) {
        return { ...thread, likes: thread.likes === 1 ? 0 : 1 };
      }
      return thread;
    });
    setThreads(updatedThreads);
  };

  const handleRespond = (id: number, content: string, author: string) => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === id) {
        const newResponse: ResponseItemProps = { id: thread.responses?.length ? thread.responses.length + 1 : 1, author, content };
        return { ...thread, responses: [...(thread.responses || []), newResponse] };
      }
      return thread;
    });
    setThreads(updatedThreads);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const authorInput = form.elements.namedItem("author") as HTMLInputElement;
    if (titleInput && authorInput && titleInput.value.trim() !== '' && authorInput.value.trim() !== '') {
      const newThread: ThreadItemProps = { id: threads.length + 1, title: titleInput.value, author: authorInput.value, likes: 0, responses: [] };
      setThreads([...threads, newThread]);
      titleInput.value = '';
      authorInput.value = '';
    }
  };

  return (
    <><div className="root">
      <div className="content">
        <ul className="thread-list">
          {threads.map(thread => (
            <ThreadItem
              key={thread.id}
              id={thread.id}
              title={thread.title}
              author={thread.author}
              likes={thread.likes}
              responses={thread.responses}
              onDelete={() => handleDelete(thread.id)}
              onToggleLike={() => handleToggleLike(thread.id)}
              onRespond={(content, author) => handleRespond(thread.id, content, author)} />
          ))}
        </ul>
        <form className="new-thread-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="author"
            placeholder="Autor" />
          <input
            type="text"
            name="title"
            placeholder="Título" />
          <button type="submit">Crear hilo</button>
        </form>
      </div>
    </div><div className='background'></div></>
  );
}

export default Foro;
