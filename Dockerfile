FROM odoo:12.0

COPY ./extra-requirements.txt /mnt/extra-addons/extra-requirements.txt
RUN pip3 install -r /mnt/extra-addons/extra-requirements.txt
COPY ./src /mnt/extra-addons
COPY ./config /etc/odoo

USER odoo