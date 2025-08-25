import React, { useEffect, useState } from 'react'
import { InitialDashboard } from '../../../components/adminfase1/dashboard'
import { useDashboardsF1 } from '../../../hooks'

export function EstadisticaFase1() {
    const { 
        getDashBoardHasAlzheimerRisk, 
        getDashBoardHasAlcoholEvaluation,
        getDashBoardHasColumbiaQuestionnaire, 
        getDashBoardHasDrugsQuestionnaire, 
        getDashBoardHasEatingBehavior,
        getDashBoardHasGAD7,
        getDashBoardHasPSL5Questionnaire, 
        getDashBoardHasPhysicalActivity,
        getDashBoardHasPlutchickQuestionnaire, 
        getDashBoardHasPsychiatricSymptoms, 
        getDashBoardHasSleepQuality,
        getDashBoardHasTraumaticEvents,
        getOpcionesPreguntaUsuarios,
    } = useDashboardsF1();

    const [datasets, setDatasets] = useState([]);
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // === 1. Dashboards (agrupados de 4 en 4) ===
            const results = await Promise.all([
                getDashBoardHasAlzheimerRisk(),
                getDashBoardHasAlcoholEvaluation(),
                getDashBoardHasColumbiaQuestionnaire(),
                getDashBoardHasDrugsQuestionnaire(),
                getDashBoardHasEatingBehavior(),
                getDashBoardHasGAD7(),
                getDashBoardHasPSL5Questionnaire(),
                getDashBoardHasPhysicalActivity(),
                getDashBoardHasPlutchickQuestionnaire(),
                getDashBoardHasPsychiatricSymptoms(),
                getDashBoardHasSleepQuality(),
                getDashBoardHasTraumaticEvents(),
            ]);

            const grouped = [];
            for (let i = 0; i < results.length; i += 4) {
                grouped.push(results.slice(i, i + 4));
            }
            setDatasets(grouped);

            // === 2. Solo preguntas 1, 3 y 4 ===
            const ids = [1, 3, 4];
            const opciones = [];

            for (const id of ids) {
                try {
                    const res = await getOpcionesPreguntaUsuarios(id);
                    if (res?.opciones?.length) {
                        opciones.push({
                            titulo: res.titulo,
                            opciones: res.opciones,
                        });
                    }
                } catch (error) {
                    console.warn(`Pregunta ${id} no encontrada`, error);
                }
            }

            setPreguntas(opciones);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Estadísticas Fase 1</h1>

            {/* Dashboards (agrupados en grupos de 4) */}
            {datasets.map((data, index) => (
                <InitialDashboard 
                    key={`grupo-${index}`} 
                    data={data} 
                    title={`Grupo ${index + 1}`} 
                />
            ))}

            {/* Preguntas específicas (1, 3, 4) */}
            {preguntas.map((pregunta, index) => (
                <InitialDashboard 
                    key={`pregunta-${index}`} 
                    data={pregunta.opciones} 
                    title={pregunta.titulo} 
                />
            ))}
        </div>
    )
}
