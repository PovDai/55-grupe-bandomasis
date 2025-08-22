import { TitlePage } from "../../components/Title";

export function HomePage() {
    
    return (  
        
        
            <div className="container min-page-height">
                <TitlePage title='Home' />

                        <div className="container "   >
                             
                            <div style={{ textAlign: "center", marginTop: "50px" }}>
                                <h1>Sveiki atvykę į mano bandomojo egzamino svetaine!</h1>
                                <p>Čia yra paprasta React pagrindinio puslapio demonstracija.</p>
                                <button onClick={() => alert("Paspaudėte mygtuką!")}>
                                Spausk mane
                                </button>
                                </div>
  
                        </div>
                </div>
    )
}