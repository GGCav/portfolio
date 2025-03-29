// components/Experience.js
import React from 'react';

const Experience = () => {
  return (
    <section>
      <h2 className="section-title">EXPERIENCE</h2>
      <p><strong>Alibaba Group</strong> - Software Engineer Intern (Dec 2023 - Feb 2024)</p>
      <p>Delivered and maintained server-side applications in distributed microservices architecture using Java, Spring Boot, and Spring Cloud Netflix, serving over 10,000 daily active users. Led database optimization that reduced response times by 40% and integrated Redis Cache that improved data access efficiency by 71%.</p>
      
      <p><strong>USoustenir</strong> - Startup Co-founder & Lead Full-Stack Developer (Apr 2023 - Dec 2023)</p>
      <p>Co-founded and developed a scalable web application using React, Redux, TypeScript, Node.js, and Express.js, providing a platform for users to discover and connect with sustainable brands. Implemented interactive mapping functionality and managed cloud infrastructure on AWS.</p>
      
      <p><strong>XMH Blockchain</strong> - Software Engineer Intern (Apr 2022 - Jul 2022)</p>
      <p>Developed ETL pipelines ingesting 80+ million daily wallet events and migrated on-premise Apache Spark jobs to AWS Glue ETL, improving table processing speed by 38% and reducing maintenance overhead.</p>
    </section>
  );
};

export default Experience;
