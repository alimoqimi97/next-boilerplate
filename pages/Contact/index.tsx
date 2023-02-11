import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";

import { withTranslation } from "@Server/i18n";
import { IStore } from "@Redux/IStore";
import { ContactActions } from "@Actions";
import { Heading, LocaleButton } from "@Components";

import { IContact, ReduxNextPageContext } from "@Interfaces";

const Contact: NextPage<IContact.IProps, IContact.InitialProps> = ({
    t,
    i18n,
}) => {
    const contact = useSelector((state: IStore) => state.contact);
    const dispatch = useDispatch();

    const renderLocaleButtons = (activeLanguage: string) =>
        ["en", "es", "tr"].map(lang => (
            <LocaleButton
                key={lang}
                lang={lang}
                isActive={activeLanguage === lang}
                onClick={() => i18n.changeLanguage(lang)}
            />
        ));

    return (
        <div>
            {renderLocaleButtons(i18n.language)}
        </div>
    );
};

Contact.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<IContact.InitialProps> => {
    await ctx.store.dispatch(
        ContactActions.GetApod({
            params: { hd: true },
        })
    );
    return { namespacesRequired: ["common"] };
};

const Extended = withTranslation("common")(Contact);

export default Extended;
