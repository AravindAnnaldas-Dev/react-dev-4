import React, { useEffect } from 'react';

const Accordian = () => {
  useEffect(() => {
    const accordian_ctn = document.querySelectorAll('.accordian_ctn');
    const accordian_head = document.querySelectorAll('.accordian_head');

    const toggleAccordion = (event: Event) => {
      const acc_head = event.currentTarget as HTMLElement;
      const acc_ctn: any = acc_head.parentElement;

      accordian_ctn.forEach((ac_ctn) => {
        if (ac_ctn !== acc_ctn) {
          ac_ctn.classList.remove('acc_open');
        }
      });

      acc_ctn.classList.toggle('acc_open');
    };

    accordian_head.forEach((acc_head) => {
      acc_head.addEventListener('click', toggleAccordion);
    });

    return () => {
      accordian_head.forEach((acc_head) => {
        acc_head.removeEventListener('click', toggleAccordion);
      });
    };
  }, []);

  return (
    <div className="acc_section">
      <div className="acc_container">
        <div className="acc_wrapper">
          <div className="accordian_ctn acc_open">
            <div className="accordian_head">Accordian Head</div>
            <div className="accordian_body">
              <div className="accordian_body_content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                quis voluptate asperiores amet delectus sit dolore expedita,
                beatae possimus placeat reiciendis nobis modi, aliquam
                voluptatum, pariatur quasi eligendi nostrum excepturi ab impedit
                molestiae vel. Soluta provident voluptas cum. Iste harum eos
                nihil beatae veniam fugiat dolor? Illo tempora impedit debitis!
                Saepe, dolorum! Iure aliquid voluptas distinctio minus iste aut
                ad quaerat. Inventore sunt explicabo, autem modi soluta
                blanditiis totam accusamus? Quas fugiat ipsum ratione nemo, eum
                repudiandae veniam quam qui commodi, deleniti, impedit aliquid
                ut. Consectetur dolore pariatur facilis impedit, voluptates
                iusto saepe quod ullam molestias aut? Laborum, similique
                tempora!
              </div>
            </div>
          </div>
          <div className="accordian_ctn">
            <div className="accordian_head">Accordian Head</div>
            <div className="accordian_body">
              <div className="accordian_body_content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                quis voluptate asperiores amet delectus sit dolore expedita,
                beatae possimus placeat reiciendis nobis modi, aliquam
                voluptatum, pariatur quasi eligendi nostrum excepturi ab impedit
                molestiae vel. Soluta provident voluptas cum. Iste harum eos
                nihil beatae veniam fugiat dolor? Illo tempora impedit debitis!
                Saepe, dolorum! Iure aliquid voluptas distinctio minus iste aut
                ad quaerat. Inventore sunt explicabo, autem modi soluta
                blanditiis totam accusamus? Quas fugiat ipsum ratione nemo, eum
                repudiandae veniam quam qui commodi, deleniti, impedit aliquid
                ut. Consectetur dolore pariatur facilis impedit, voluptates
                iusto saepe quod ullam molestias aut? Laborum, similique
                tempora!
              </div>
            </div>
          </div>
          <div className="accordian_ctn">
            <div className="accordian_head">Accordian Head</div>
            <div className="accordian_body">
              <div className="accordian_body_content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                quis voluptate asperiores amet delectus sit dolore expedita,
                beatae possimus placeat reiciendis nobis modi, aliquam
                voluptatum, pariatur quasi eligendi nostrum excepturi ab impedit
                molestiae vel. Soluta provident voluptas cum. Iste harum eos
                nihil beatae veniam fugiat dolor? Illo tempora impedit debitis!
                Saepe, dolorum! Iure aliquid voluptas distinctio minus iste aut
                ad quaerat. Inventore sunt explicabo, autem modi soluta
                blanditiis totam accusamus? Quas fugiat ipsum ratione nemo, eum
                repudiandae veniam quam qui commodi, deleniti, impedit aliquid
                ut. Consectetur dolore pariatur facilis impedit, voluptates
                iusto saepe quod ullam molestias aut? Laborum, similique
                tempora!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
