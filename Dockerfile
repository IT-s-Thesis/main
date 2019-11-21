FROM odoo:12.0


COPY ./extra-requirements.txt extra-requirements.txt
RUN pip3 install -r extra-requirements.txt

COPY ./src /mnt/extra-addons
COPY ./config /etc/odoo

