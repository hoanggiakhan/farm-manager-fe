// src/components/About.tsx
import React from 'react';
import './About.css';

interface TeamMember {
  name: string;
  position: string;
  description: string;
}

const About: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Nguyễn Văn A',
      position: 'Giám đốc điều hành',
      description: 'Người sáng lập nông trại với hơn 20 năm kinh nghiệm trong lĩnh vực nông nghiệp.'
    },
    {
      name: 'Trần Thị B',
      position: 'Quản lý sản xuất',
      description: 'Chuyên gia về sản xuất và quy hoạch, giúp đảm bảo chất lượng nông sản.'
    },
    {
      name: 'Lê Văn C',
      position: 'Quản lý nhân sự',
      description: 'Phụ trách các hoạt động nhân sự và phát triển đội ngũ nhân viên.'
    }
  ];

  return (
    <div className="about-container">
      <section className="intro-section">
        <h2>Giới thiệu về Nông trại</h2>
        <p>
          Nông trại chúng tôi được thành lập vào năm 2005 với mục tiêu mang đến nông sản sạch và an toàn cho người tiêu dùng.
          Với hơn 15 năm hoạt động, chúng tôi đã xây dựng một hệ thống nông trại hiện đại kết hợp giữa truyền thống và công nghệ tiên tiến.
        </p>
      </section>

      <section className="mission-section">
        <h2>Lịch sử và Sứ mệnh</h2>
        <p>
          Chúng tôi bắt đầu từ một trang trại nhỏ, nhưng nhờ vào nỗ lực không ngừng nghỉ, hiện nay chúng tôi đã mở rộng quy mô lên đến hàng trăm hecta.
          Sứ mệnh của chúng tôi là cung cấp nông sản sạch, an toàn và bền vững, góp phần nâng cao chất lượng cuộc sống của cộng đồng.
        </p>
      </section>

      <section className="team-section">
        <h2>Đội ngũ quản lý</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <h3>{member.name}</h3>
              <p><strong>Chức vụ:</strong> {member.position}</p>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
