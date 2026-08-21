let currentBasePrice = 2500000;
        let selectedProjectTitle = "Website Landing Page";
        let activeFeatures = [];

        document.addEventListener('DOMContentLoaded', () => {
            const header = document.getElementById('site-header');
            const hamburgerBtn = document.getElementById('hamburger-btn');
            const mobileDrawer = document.getElementById('mobile-drawer');
            const mobileOverlay = document.getElementById('mobile-overlay');

            // Header Scroll Effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 30) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Back to Top Button Logic
            const backToTopBtn = document.getElementById('back-to-top');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });

            if (backToTopBtn) {
                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            // Mobile Navigation Toggle
            const toggleDrawer = (open) => {
                const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('active');
                mobileDrawer.classList.toggle('active', isOpen);
                mobileOverlay.classList.toggle('active', isOpen);
                hamburgerBtn.classList.toggle('active', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            };

            hamburgerBtn.addEventListener('click', () => toggleDrawer());
            mobileOverlay.addEventListener('click', () => toggleDrawer(false));

            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => toggleDrawer(false));
            });

            // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(other => other.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });

            // Form Submit Modal Notification
            const contactForm = document.getElementById('contact-form');
            const customModal = document.getElementById('custom-modal');
            const modalCloseBtn = document.getElementById('modal-close-btn');

            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    customModal.classList.add('active');
                    contactForm.reset();
                });
            }

            if (modalCloseBtn) {
                modalCloseBtn.addEventListener('click', () => {
                    customModal.classList.remove('active');
                });
            }

            customModal.addEventListener('click', (e) => {
                if (e.target === customModal) {
                    customModal.classList.remove('active');
                }
            });
        });

        function selectType(element, price, name) {
            document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('selected'));
            element.classList.add('selected');
            currentBasePrice = price;
            selectedProjectTitle = name;
            updateCalculator();
        }

        function toggleFeature(element, price, featureName) {
            element.classList.toggle('selected');
            const index = activeFeatures.findIndex(f => f.name === featureName);
            if (index > -1) {
                activeFeatures.splice(index, 1);
            } else {
                activeFeatures.push({ name: featureName, price: price });
            }
            updateCalculator();
        }

        function updateCalculator() {
            let total = currentBasePrice;
            activeFeatures.forEach(f => total += f.price);
            
            document.getElementById('calc-project-title').innerText = 'Kategori: ' + selectedProjectTitle;
            document.getElementById('calc-total-price').innerText = 'Rp ' + total.toLocaleString('id-ID');
        }

        function orderFromCalculator() {
            let total = currentBasePrice;
            activeFeatures.forEach(f => total += f.price);
            const text = `Halo BlueGreen Studio, saya ingin berkonsultasi mengenai ${selectedProjectTitle} dengan estimasi Rp ${total.toLocaleString('id-ID')}.`;
            window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
        }

        function switchTechTab(category) {
            document.querySelectorAll('.tech-tab-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const cards = document.querySelectorAll('.tech-card');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function filterPortfolio(category) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const items = document.querySelectorAll('.portfolio-card');
            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-cat') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }