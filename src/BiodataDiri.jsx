import React from 'react';
import './custom.css';

// ==========================================
// 6 CHILD COMPONENTS (KOMPONEN ANAK)
// ==========================================

// Child 1: Komponen Avatar untuk menampilkan foto profil
const Avatar = () => (
    <div className="avatar-wrapper">
        <img src="/img/profile.jpeg" alt="Naila" className="img-profile" />
    </div>
);

// Child 2: Komponen Header yang menerima data 'name' melalui PROPS
const Header = ({ name }) => (
    <div>
        <h1>{name}</h1>
        <span className="badge-status">Information Systems Student</span>
    </div>
);

// Child 3: Komponen Skills menggunakan fungsi .map() untuk menampilkan list dari Array
const Skills = () => (
    <div className="skill-tags">
        {['Laravel', 'PHP', 'MySQL', 'React', 'Git'].map(s => (
            <span key={s} className="tag-item">#{s}</span>
        ))}
    </div>
);

// Child 4: Komponen PortfolioProjects yang berisi logika Array Object untuk daftar proyek
const PortfolioProjects = () => {
    const myProjects = [
        { 
            name: "Sistem Informasi Kebencanaan", 
            tag: "Laravel", 
            desc: "Platform manajemen data logistik dan pelaporan situasi darurat secara real-time." 
        },
        { 
            name: "Buku Tamu Digital", 
            tag: "Laravel", 
            desc: "Sistem pencatatan pengunjung otomatis dengan fitur export data dan dashboard admin." 
        }
    ];

    return (
        <div className="project-list">
            <h3 style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}>
                Recent Projects
            </h3>
            {/* Mapping data proyek Laravel */}
            {myProjects.map((p, index) => (
                <div key={index} className="project-card-mini">
                    <div className="project-header">
                        <span className="project-name">{p.name}</span>
                        <span className="project-tag">{p.tag}</span>
                    </div>
                    <p className="project-desc">{p.desc}</p>
                </div>
            ))}
        </div>
    );
};

// Child 5: Komponen Academic yang menerima data NIM dan UNIV melalui OBJEK PROPS
const Academic = (props) => (
    <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
        <div className="info-grid">
            <span>NIM</span>
            <b>{props.nim}</b>
        </div>
        <div className="info-grid">
           
            <b>{props.univ}</b>
        </div>
    </div>
);

// Child 6: Komponen Footer untuk bagian paling bawah portofolio
const Footer = () => (
    <footer>
        <p>© 2026 • naila-green-void</p>
    </footer>
);

// ==========================================
// PARENT COMPONENT (KOMPONEN INDUK)
// ==========================================
export default function BiodataDiri() {
    return (
        <div className="portfolio-card">
          
            {/* Memanggil ke-6 Child Components ke dalam satu tampilan utama */}
            <Avatar />
            
            {/* Mengirim data name melalui props ke Child 2 */}
            <Header name="Naila Yohanda Putri" />
            
            <Skills />
            
            <PortfolioProjects />
            
            {/* Mengirim data nim dan univ melalui props ke Child 5 */}
            <Academic nim="2457301107" univ="Politeknik Caltex Riau" />
            
            <Footer />
        </div>
        
    );
}