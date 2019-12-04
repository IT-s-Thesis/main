FROM odoo:12.0


COPY ./extra-requirements.txt extra-requirements.txt
CMD pip3 install -r extra-requirements.txt

COPY ./src /mnt/extra-addons
COPY ./config /etc/odoo


ENTRYPOINT ["/entrypoint.sh"]
CMD ["odoo"]