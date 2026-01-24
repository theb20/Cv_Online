export const fetchSuggestions = async () => {
    return [
        "Quels sont vos projets récents ?",
        "Quelles technologies utilisez-vous ?",
        "Comment puis-je vous contacter ?"
    ];
};

export const fetchStats = async () => {
    return {
        projects: 12,
        experience: 5,
        contributions: 450
    };
};

export const sendChatMessage = async (message, history) => {
    // Simulation d'une réponse de chatbot basique
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes("projet") || lowerMsg.includes("portfolio")) {
        return {
            text: "J'ai travaillé sur plusieurs projets passionnants, incluant des applications web, des sites e-commerce et des outils de gestion. Vous pouvez les voir dans la section Projets !",
            type: "text"
        };
    }
    
    if (lowerMsg.includes("techno") || lowerMsg.includes("stack") || lowerMsg.includes("langage")) {
        return {
            text: "Je travaille principalement avec React, Node.js, Tailwind CSS et Python. J'aime aussi explorer de nouvelles technologies comme l'IA et la 3D sur le web.",
            type: "text"
        };
    }
    
    if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("joindre")) {
        return {
            text: "Vous pouvez me contacter via le formulaire de contact ou directement par email. Je suis toujours ouvert aux nouvelles opportunités !",
            type: "text"
        };
    }

    return {
        text: "Merci pour votre message ! Je suis un assistant virtuel. N'hésitez pas à explorer le portfolio pour en savoir plus sur mon travail.",
        type: "text"
    };
};

export const resetChatSession = async () => {
    // No-op
};
