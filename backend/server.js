import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Hello World");
});


const generateInput = (history, contextInput) => {
    return `$
    You are being used in a service and not as a chatbot so dont talk just generate. this is my search history, infer what i would have researched and make a marp progress presentation out of it (just return the markdown, nothing else): ${JSON.stringify(history)}
    You dont need to explain all the urls, just use it as context and mention useful information from them.
    Use the following sample markdown for the presentation, you can use the context input to change the last week and next steps ${contextInput}:
    ---
    marp: true
    theme: default
paginate: true
header: "Improving the Optimization Platform"
footer: "Aftab Khan | July 3, 2025"
---

# Improving the Optimization Platform
## Subtitle
**Aftab Khan**
July 3, 2025

---
## Last Week

- Fixed HMR bug makes frontend update more streamlined for developers
- Found libraries to get around with drag and drop issues
- Addressed challenges in refactoring
- Discussed new ideas such as portable workspaces and importing from various sources
- Also discussed about potential ways AI could come into the picture

---

## Objective for the Week
- **Explore web accessibility principles** to understand their application in front-end development.
- **Investigate current research** on integrating AI into front-end development processes.
- Align findings with thesis goal: improving user experience through accessible and AI-enhanced web interfaces.

---

## Work Done This Week
### Web Accessibility (a11y) Research

  - **W3C Web Accessibility Initiative (WAI)**: Reviewed tutorials and guidelines on accessible design (e.g., Success Criterion 1.3.1: Info and Relationships). [https://www.w3.org/WAI/](https://www.w3.org/WAI/)[](https://paperpile.com/g/academic-search-engines/)
  - **The A11Y Project**: Studied introductory resources and accessibility checklist for practical implementation. [https://www.a11yproject.com/](https://www.a11yproject.com/)
  - **Vision Ireland**: Searched for real-world applications of accessibility, focusing on organizations supporting visually impaired users. [https://vi.ie/](https://vi.ie/)

---
## Work Done This Week
### AI in Front-End Development

  - Reviewed EPAM Startups’ blog on AI integration best practices. [https://startups.epam.com/blog/ai-and-frontend-development](https://startups.epam.com/blog/ai-and-frontend-development)

---

## Next Steps
  - Dive deeper into WCAG 2.2 Success Criteria via W3C tutorials.
  - Search academic databases (e.g., Google Scholar, Semantic Scholar) for AI-driven accessibility research.[](https://paperpile.com/g/academic-search-engines/)
  - Develop a preliminary outline for integrating AI into accessible front-end design.
  - Contact an expert from Vision Ireland for insights on accessibility needs.

---

## References
- Web Accessibility Initiative (WAI), W3C. [https://www.w3.org/WAI/](https://www.w3.org/WAI/)
- The A11Y Project. [https://www.a11yproject.com/](https://www.a11yproject.com/)
- Vision Ireland. [https://vi.ie/](https://vi.ie/)
- EPAM Startups Blog. [https://startups.epam.com/blog/ai-and-frontend-development](https://startups.epam.com/blog/ai-and-frontend-development)


    `
}


app.post("/generate", async (req, res) => {
    const history = req.body.history;
    const contextInput = req.body.context;
    console.log(history, contextInput)
    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4.1",
            tools: [{ type: "web_search_preview", }],
            input: generateInput(history, contextInput)
        })
    });

    const data = await response.json();
    res.json(data);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
