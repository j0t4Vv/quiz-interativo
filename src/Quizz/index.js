import React, { useState } from 'react';
import './style.css';
import { Perguntas } from '../Data/perguntas';

function Quizz() {
    const questions = Perguntas ?? [];
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [showPontuacao, setShowPontuacao] = useState(false);
    const [pontos, setPontos] = useState(0);

    function proximaPergunta(correta) {
        const nextQuestion = perguntaAtual + 1;

        if (correta) {
            setPontos(pontos + 1);
        }

        if (nextQuestion < questions.length) {
            setPerguntaAtual(nextQuestion);
        } else {
            setShowPontuacao(true);
        }
    }

    function reiniciarQuiz() {
        setPerguntaAtual(0);
        setShowPontuacao(false);
        setPontos(0);
    }

    return (
        <div className='container'>
            {showPontuacao ? (
                <div className='pontuacao'>
                    <span>Você acertou: {pontos} perguntas de {questions.length}</span>
                    <button className='restart' onClick={reiniciarQuiz}>Reiniciar</button>
                </div>
            ) : (
                <>
                    <div className='infoperguntas'>
                        <div className='contagemPerguntas'>
                            <span>Pergunta {perguntaAtual + 1}/{questions.length}</span>
                        </div>
                        <div className='pergunta'>{questions[perguntaAtual].pergunta}</div>
                    </div>
                    <div className='resposta'>
                        {questions[perguntaAtual].opcoesResposta.map((opcoesResposta) => (
                            <div className='grupoResposta' key={opcoesResposta.alternativa}>
                                <span>{opcoesResposta.alternativa}</span>
                                <button onClick={() => proximaPergunta(opcoesResposta.correta)}>
                                    {opcoesResposta.resposta}
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Quizz;
