export function getLogin(req, res) {
    if (req.user.isLoggedIn) {
        return res
            .json({
                status: 'success',
                msg: 'Tu buvai sekmingai prijungtas prie sistemos',
                user: {
                    email: req.user.email,
                    id: req.user.id,
                },
            });
    } else {
        return res
            .json({
                status: 'error',
                msg: 'Tu nesi prijungtas prie sistemos',
            });
    }
}